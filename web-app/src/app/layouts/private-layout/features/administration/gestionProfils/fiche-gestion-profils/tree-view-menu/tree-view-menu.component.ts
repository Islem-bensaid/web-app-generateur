import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestObject} from "@shared/models";
import {ConstanteWs} from "@shared/constantes/ConstanteWs";
import {ResponseObject} from "@shared/models/ResponseObject";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {AppTranslateService, ToastService} from "@shared/services";
import {ADMINISTRATION_URI} from '@privateLayout/shared/constantes';
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {SelectionModel} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";
import { getNmCurrentLabel } from '@shared/tools';

export class TodoItemNode {
    menuId: string;
    tooltip: string;
    title: string;
    isChecked: boolean;
    libelleFr: string;
    libelleEn: string;
    libelleAr: string;
    submenus: TodoItemNode[];
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    menuId: string;
    tooltip: string;
    title: string;
    isChecked: boolean;
    level: number;
    expandable: boolean;
}

@Component({
    selector: 'app-tree-view-menu',
    templateUrl: './tree-view-menu.component.html',
    styleUrls: ['./tree-view-menu.component.css']
})
export class TreeViewMenuComponent implements OnInit {
    @Input() editMode: any;
    @Input() data: any;
    @Input() isDisable: boolean=false;
    @Output() dataChecked = new EventEmitter<any>();

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    constructor(
        private appTranslateService: AppTranslateService,
        private toast: ToastService,
        private sharedService: SharedService,
    ) {
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren,
        );
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.dataChange.subscribe(data => {
            this.dataSource.data = data;

            this.initAllNodesSelection(this.treeControl);
        });
    }

    ngOnInit(): void {
        this.getMenu();

    }

    getMenu() {
        if (!this.editMode) {
            this.checklistSelection.clear();
            const request: RequestObject = <RequestObject>{
                uri: ADMINISTRATION_URI.GESTION_USER.MENU_LIST,
                microservice: ConstanteWs._CODE_ADMINISTRATION,
                method: ConstanteWs._CODE_GET
            };
            this.sharedService.commonWs(request).subscribe({
                next: (response: ResponseObject) => {
                    if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                        this.dataSource.data = response.payload;

                        this.initAllNodesSelection(this.treeControl);
                    } else {
                        console.error(`Error in PrivateLayoutComponent/getMenu, error code :: ${response.code}`);
                        this.toast.error();
                    }
                },
                error: (error) => {
                    console.error(`Error in PrivateLayoutComponent/getMenu, error :: ${error}`);
                    this.toast.error();
                }
            });
        } else {
            this.dataSource.data = this.data
            this.initAllNodesSelection(this.treeControl);
        }

    }

    initialize(menusList = []) {
        this.dataChange.next(this.buildMenuTree(menusList));
    }

    buildMenuTree(menusList): TodoItemNode[] {
        let menusListTemp: TodoItemNode[] = [];
        menusList.forEach((e) => {
            const node = new TodoItemNode();
            node.menuId = e.menuId;
            node.tooltip = e.tooltip;
            node.title = e.title;
            node.submenus = e.submenus.length ? e.submenus : null;
            menusListTemp.push(node);
        });
        return menusListTemp;
    }

    checkLeaf(oNode: TodoItemNode | TodoItemFlatNode, value: boolean, menusList) {
        for (const tempNode of menusList) {
            if (tempNode) {
                tempNode.dtMaj = null;
                if (oNode.menuId === tempNode.menuId) {
                    if (tempNode.isChecked == true) {
                        return;
                    }
                    tempNode.isChecked = value;
                    return;
                } else {
                    if (!!tempNode.submenus?.length) {
                        this.checkLeaf(oNode, value, tempNode.submenus);
                    }
                }
            }
        }
    }

    checkSelLeafAndAllDependances() {

        // const value = this.checklistSelection.selected? 1:0
        const uncheckAllItems = (datalist) => {
            for (const todoItemNode of datalist) {
                if (todoItemNode) {
                    todoItemNode.isChecked = false;
                    if (!!todoItemNode.submenus?.length) {
                        uncheckAllItems(todoItemNode.submenus);
                    }
                }
            }
        };
        
        let tempDataList = [...this.dataSource.data];
        console.log('first tempDataList ',tempDataList)
        console.log('this.checklistSelection.selected : ', this.checklistSelection.selected)
        uncheckAllItems(tempDataList);
        for (const sNode of this.checklistSelection.selected) {
            if (sNode) {
                this.checkLeaf(sNode, true, tempDataList);
                let parent: TodoItemFlatNode | null = this.getParentNode(sNode);
                if (parent) {
                    this.checkLeaf(parent, true, tempDataList);
                    while (parent) {
                        parent = this.getParentNode(parent);
                        if (parent) {
                            this.checkLeaf(parent, true, tempDataList);
                        }
                    }
                }
            }
        }
      let   list=[]
      console.log('tempDataList : ', tempDataList)
   
        for (let i = 0; i < tempDataList.length; i++) {
            if (tempDataList[i]) {
                if (tempDataList[i].submenus.length) {
                    for (let j = 0; j < tempDataList[i].submenus.length; j++) {
                        if (tempDataList[i].submenus[j].isChecked ==true) {
                            list.push(tempDataList[i])
                            break;
                        }
                        if (tempDataList[i].submenus[j].isChecked == true) {
                            list[i]['submenus'].push(tempDataList[i])
                        }
                    }

                } else {
                        if (tempDataList[i].isChecked ==true) {
                            list.push(tempDataList[i])
                        }
                    }
                }
        }
        console.log('list ',list)
        
        let submenu =[]
        for (const item of list){
            console.log('item:: ',item.submenus.length)
                for(let j=0 ;j< item.submenus.length;j++ ){
                    if(item.submenus[j].isChecked ==true){
                        submenu.push(item.submenus[j])
                    }
                }

                item.submenus=submenu;
            
            
        }
        return list;
    }


    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.submenus;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.menuId === '';

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {

        const existingNode = this.nestedNodeMap.get(node);
        const flatNode =
            existingNode && existingNode.menuId === node.menuId ? existingNode : new TodoItemFlatNode();
        flatNode.menuId = node.menuId;
        flatNode.tooltip = node.tooltip;
        flatNode.title = node[ getNmCurrentLabel(this.appTranslateService.getDefaultLang())];
        flatNode.isChecked =this.editMode?false:node.isChecked;
        flatNode.level = level;
        flatNode.expandable = !!node.submenus?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        if (!flatNode.expandable && node.isChecked) {
            this.todoLeafItemSelectionToggle(flatNode, node.isChecked);
        }
        return flatNode;
    };

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected =
            descendants.length > 0 &&
            descendants.every(child => {
                return this.checklistSelection.isSelected(child);
            });
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode, event): void {
        // this.accessRightsService.checkLeaf(node);
        // this.checkLeafAndAllDependances(node, event.checked?1:0);
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.forEach(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode, event): void {


        // this.accessRightsService.checkLeaf(node);
        // this.checkLeafAndAllDependances(node, event.checked? 1:0);
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected =
            descendants.length > 0 &&
            descendants.every(child => {
                return this.checklistSelection.isSelected(child);
            });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */

    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }


    initAllNodesSelection(treeControl) {
        const listExpandableNodesLvl1 = treeControl.dataNodes.filter((node: TodoItemFlatNode) => (node.expandable && node.level == 1));
        for (const expandableNodeLvl1 of listExpandableNodesLvl1) {
            const descendants = this.treeControl.getDescendants(expandableNodeLvl1);
            const descAllChecked = descendants.length > 0 && descendants.every(child => {
                return child.isChecked;
            });
            if (descAllChecked) {
                this.todoLeafItemSelectionToggle(expandableNodeLvl1, 1);
            }
        }
        const listExpandableNodesLvl0 = treeControl.dataNodes.filter((node: TodoItemFlatNode) => (node.expandable && node.level == 0));
        for (const expandableNodeLvl0 of listExpandableNodesLvl0) {
            this.checkRootNodeSelection(expandableNodeLvl0);
        }
    }

}
