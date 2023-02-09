import {Extension} from 'ng2-adsk-forge-viewer';
import {EventEmitter, Injectable} from '@angular/core';
import { IMyExtension1 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention1';

// declare const THREE: any;
// declare const Autodesk: any;
const Autodesk = window.Autodesk;

@Injectable({
  providedIn: 'root',
})
export class MyExtension1 extends Extension implements IMyExtension1 {

  // Extension must have a name
  public static extensionName: string = 'MyExtension1';

  public static myStaticViewer;

  // Toolbar test
  private subToolbar: Autodesk.Viewing.UI.ToolBar;
  private onToolbarCreatedBinded: any;

  public activate() {
    return true;
  }

  public deactivate() {
    return true;
  }

  public load() {
    MyExtension1.myStaticViewer = this.viewer;
    // Called when Forge Viewer loads your extension
    this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (e) => {
      if (e.dbIdArray.length) {
        const dbId = e.dbIdArray[0];
        this.viewer.setThemingColor(dbId, new THREE.Vector4(0, 1, 1, 1));
      }
    });

    // Initialise a toolbar
    if (this.viewer.toolbar) {
      // Toolbar is already available, create the UI
      this.createUI();
    } else {
      // Toolbar hasn't been created yet, wait until we get notification of its creation
      this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
      /* this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded); */
      this.viewer.addEventListener(Autodesk.Viewing.TRANSITION_STARTED, this.onToolbarCreatedBinded);
      /* this.viewer.addEventListener(Autodesk.Viewing.TRANSITION_ENDED, this.onToolbarCreatedBinded); */
    }

    // Must return true or extension will fail to load
    return true;
  }

  public unload() {
    if (this.subToolbar) {
      this.viewer.toolbar.removeControl(this.subToolbar);
      this.subToolbar = null;
    }

    // Called when Forge Viewer unloads your extension
    // Must return true or extension will fail to unload
    return true;
  }

  public onToolbarCreated() {
    this.viewer.removeEventListener(Autodesk.Viewing.TRANSITION_STARTED, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
  }

  private createUI() {
    // // Button 1
    // const button1 = new Autodesk.Viewing.UI.Button('my-view-front-button');
    // button1.onClick = e => this.setViewCube('front');
    // button1.addClass('my-view-front-button');
    // button1.addClass('my-view-front-button');
    // button1.setToolTip('View front');
    //
    // // Button 2
    // const button2 = new Autodesk.Viewing.UI.Button('my-view-back-button');
    // button2.onClick = e => this.setViewCube('back');
    // button2.addClass('my-view-back-button');
    // button2.setToolTip('View Back');
    //
    // // SubToolbar
    // this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
    // this.subToolbar.addControl(button1);
    // this.subToolbar.addControl(button2);
    //
    // this.viewer.toolbar.addControl(this.subToolbar);
  }

  private setViewCube(orientation: 'front' | 'back') {
    const ext = (this.viewer.getExtension('Autodesk.ViewCubeUi') as any);
    ext.setViewCube(orientation);
  }

  async isolateFull(dbIds = []) {
    let viewer = MyExtension1.myStaticViewer;
    let model = viewer.model;
    return new Promise(async (resolve, reject) => {

      try {

        model = model || viewer.model;

        // First we call the native isolate function
        // so hidden components will not interfere
        // with selection
        viewer.isolate(dbIds);

        const targetIds = Array.isArray(dbIds) ? dbIds : [dbIds];

        const targetLeafIds = await this.getLeafNodes(model, targetIds) as any[];

        const leafIds = await this.getLeafNodes(model) as any[];

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

// Helper method: returns all leaf node dbIds for
// given input dbIds. A leaf node is a node that
// doesn't have any children
  getLeafNodes(model, dbIds?) {

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

  public isolateItems(taskCodes) {
    const emitDbIdsEvent = new EventEmitter<any>();

    let isolateFullFct = this.isolateFull;
    const getNodesDbIDsToIsolate = (viewer) => {
      const DbIds = ((viewer) => {
        let instanceTree = viewer.model.getData().instanceTree;
        return Object.keys(instanceTree.nodeAccess.dbIdToIndex).map(function (id) {
          return parseInt(id);
        });
      })(viewer);
      const dbIds = [];

      let i = 0;

      for (const id of DbIds) {
        viewer.getProperties(id, function (e) {
          e.properties = e.properties.filter(prop => (prop.attributeName = 'TASK_CODE' && taskCodes.includes(prop.displayValue)));
          if (e.properties.length > 0) {
            dbIds.push(e.dbId);
            isolateFullFct(dbIds);
            i++;
          }
        });
      }
      if (i == DbIds.length) {
        emitDbIdsEvent.emit(dbIds);
        return dbIds;
      }
    };


    return new Promise(resolve => resolve(getNodesDbIDsToIsolate(MyExtension1.myStaticViewer))) ;
  }
}
