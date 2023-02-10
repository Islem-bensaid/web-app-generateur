import { Injectable } from '@angular/core';
import { ForgeAuthentificationService } from '@privateLayout/shared/services/forge-authentification.service';
import { isEmptyValue } from '@shared/tools';
import { MyExtension } from '@privateLayout/shared/services/viewer-extentions/my-extension';
import { Extension, ViewerInitializedEvent } from 'ng2-adsk-forge-viewer';
import { MyExtension6 } from '@privateLayout/shared/services/viewer-extentions/my-extension6';
import { MyExtension2 } from '@privateLayout/shared/services/viewer-extentions/my-extension2';
import { MyExtension1 } from '@privateLayout/shared/services/viewer-extentions/my-extension1';
import { MyExtension5 } from '@privateLayout/shared/services/viewer-extentions/my-extension5';
import { MyExtension4 } from '@privateLayout/shared/services/viewer-extentions/my-extension4';
import { MyExtension3 } from '@privateLayout/shared/services/viewer-extentions/my-extension3';


declare const Autodesk: any;

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  private _viewer: any;
  private _options: any = {
    env: 'AutodeskProduction',
    api: 'derivativeV2', // TODO: for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: (
      onGetAccessToken: (token: string, expire: number) => void
    ) => {
      const expireTimeSeconds = 60 * 30;
      onGetAccessToken(ForgeAuthentificationService.getForgeAccessToken, expireTimeSeconds);
    }
  };

  constructor() {
  }

  /** public static called functions */

  public initNativeViewer(htmlElement, urnsList) {
    Autodesk.Viewing.Initializer(this._options, this._initialized.bind(this, htmlElement, urnsList));
  }

  public isolateItems(taskCodes) {
    const getNodesDbIDsToIsolate = (viewer) => {
      return new Promise(resolve => {
        const DbIds = ((viewer) => {
          let instanceTree = viewer.model.getData().instanceTree;
          return Object.keys(instanceTree.nodeAccess.dbIdToIndex).map(function(id) {
            return parseInt(id);
          });
        })(viewer);

        const _isolateFullInner = (e ) => {
          listItems.push(e);
          // console.log(e);
          e.properties = e.properties.filter(prop => (prop.attributeName.includes('TASK_CODE') && taskCodes.includes(prop.displayValue)));
          // e.properties = e.properties.filter(prop => (prop.attributeName == 'TASK_CODE' && prop.displayName == 'TASK_CODE'));

          if (e.properties.length > 0) {
            dbIds.push(e.dbId);
          }
          i++;
          if (i == DbIds.length - 1) {
            console.log('listItems', JSON.stringify(listItems));
            console.log('dbIds', dbIds);
            this._isolateFull(dbIds);
            resolve(false);
          }
        }

        const dbIds = [];

        let i = 0;
        const listItems = [];
        for (const id of DbIds) {
          viewer.getProperties(id, (e)=>_isolateFullInner(e));
        }
      });
    };
    return getNodesDbIDsToIsolate(this._viewer);
    // console.log('aaaa', await getNodesDbIDsToIsolate(this._viewer));
  }

  /** initialize viewer private functions */

  private async _initialized(htmlElement, urnsList) {
    if (isEmptyValue(urnsList) || !urnsList.length) {
      return;
    }

    // var htmlElement = document.getElementById('MyViewerDiv');
    if (!isEmptyValue(htmlElement)) {
      // Create and start the viewer in that element
      this._viewer = new Autodesk.Viewing.GuiViewer3D(htmlElement);
      this._viewer.start();
      // Load the document into the viewer.
      urnsList.forEach(urn=>{
        Autodesk.Viewing.Document.load(
          this._verifyUrn(urn),
          this._onDocumentLoadSuccess.bind(this),
          this._onDocumentLoadFailure.bind(this)
        );
      })
    }
  }

  private _verifyUrn(documentId: string): string {
    return (documentId.startsWith('urn:')) ? documentId : `urn:${documentId}`;
  }

  private _onDocumentLoadSuccess(document) {
    if (!document.getRoot()) {
      return;
    }
    let viewable = (document.getRoot() as any).getDefaultGeometry();
    if (!viewable) {
      const allModels = document.getRoot().search({ type: 'geometry' });
      viewable = allModels[0];
    }
    this._viewer.loadDocumentNode(document, viewable,{
      // preserveView: true,
      keepCurrentModels: true,
      // placementTransform: (new THREE.Matrix4()).makeRotationZ(90).setPosition(<Vector3>{x:-50,y:0,z:-50}),
      globalOffset: {x:0,y:0,z:0}
    }).then(function() {
      console.info('Viewable Loaded!');
    }).catch(function(err) {
        console.error('Viewable failed to load:: ', err);
      }
    );
  }

  private _onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode: ' + viewerErrorCode);
    document.getElementById('MyViewerDiv').innerHTML = '<p>Translation in progress... Please try refreshing the page.</p>';
  }

  /** isolation tasks private functions */

  private async _isolateFull(dbIds = []) {
    let viewer = this._viewer;
    let model = viewer.model;
    return new Promise(async (resolve, reject) => {

      try {

        model = model || viewer.model;

        // First we call the native isolate function
        // so hidden components will not interfere
        // with selection
        viewer.isolate(dbIds);

        const targetIds = Array.isArray(dbIds) ? dbIds : [dbIds];

        const targetLeafIds = await this._getLeafNodes(model, targetIds) as any[];

        const leafIds = await this._getLeafNodes(model) as any[];

        const leafTasks = leafIds.map((dbId) => {

          return new Promise((resolveLeaf) => {

            const show = !targetLeafIds.length || targetLeafIds.indexOf(dbId) > -1;

            viewer.impl.visibilityManager.setNodeOff(dbId, !show);

            resolveLeaf(show);
          });
        });

        return Promise.all(leafTasks);

      } catch (ex) {

        return reject(ex);
      }
    });
  }

  private _getLeafNodes(model, dbIds?) {

    return new Promise((resolve, reject) => {

      try {

        const instanceTree = model.getData().instanceTree;

        dbIds = dbIds || instanceTree.getRootId();

        const dbIdArray = Array.isArray(dbIds) ? dbIds : [dbIds];

        let leafIds = [];

        const getLeafNodesRec = (id) => {

          var childCount = 0;

          instanceTree.enumNodeChildren(id, (childId) => {

            getLeafNodesRec(childId);

            ++childCount;
          });

          if (childCount == 0) {

            leafIds.push(id);
          }
        };

        for (var i = 0; i < dbIdArray.length; ++i) {

          getLeafNodesRec(dbIdArray[i]);
        }

        return resolve(leafIds);

      } catch (ex) {

        return reject(ex);
      }
    });
  }


  /** get Viewer options */
  getViewerDefaultOptions(index, urn) {
    const myExtention = (index) => {
      switch (index) {
        case 0:
          return MyExtension;
        case 1:
          return MyExtension1;
        case 2:
          return MyExtension2;
        case 3:
          return MyExtension3;
        case 4:
          return MyExtension4;
        case 5:
          return MyExtension5;
        case 6:
          return MyExtension6;
      }
    };
    return {
      initializerOptions: {
        env: 'AutodeskProduction',
        getAccessToken: (
          onGetAccessToken: (token: string, expire: number) => void
        ) => {
          const expireTimeSeconds = 60 * 30;
          onGetAccessToken(ForgeAuthentificationService.getForgeAccessToken, expireTimeSeconds);
        },
        api: 'derivativeV2',
        enableMemoryManagement: true
      },
      viewerConfig: {
        extensions: ['Autodesk.DocumentBrowser', myExtention(index).extensionName],
        theme: 'dark-theme'
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        Extension.registerExtension(myExtention(index).extensionName, myExtention(index));
      },
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        args.viewerComponent.DocumentId = urn;
      }
    };
  }


}
