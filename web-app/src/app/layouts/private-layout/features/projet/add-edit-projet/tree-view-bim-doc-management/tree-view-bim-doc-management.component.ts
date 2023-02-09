import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RequestObject } from '@shared/models';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { AppTranslateService, ToastService } from '@shared/services';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { environment } from '@environments/environment';
import { SimpleChanges } from '@angular/core';
import { isInputChanged } from '@shared/tools';

export class TodoItemNode {
  id: string;
  name: string;
  displayName: string;
  urn: string;
  href: string;
  type: string;
  webViewLink: string;
  isChecked: boolean;
  children: TodoItemNode[];
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  id: string;
  displayName: string;
  urn: string;
  href: string;
  type: string;
  isChecked: boolean;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-tree-view-bim-doc-management',
  templateUrl: './tree-view-bim-doc-management.component.html',
  styleUrls: ['./tree-view-bim-doc-management.component.css']
})
export class TreeViewBimDocManagementComponent implements OnInit {
  @Input() data: any;
  @Input() editMode: any;
  @Input() isDisable: boolean = false;

  @Output() dataChecked = new EventEmitter<any>();


  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  constructor(
    public appTranslateService: AppTranslateService,
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
      // this.initAllNodesSelection(this.treeControl);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isInputChanged(changes, 'data')) {
      if (changes.data) {
        if (changes.data.currentValue !== changes.data.previousValue) {
          this.loadDataSource(changes.data.currentValue);
        }
      }
    }
  }

  loadDataSource(datalist){
    this.dataSource.data = datalist;
    // this.initAllNodesSelection(this.treeControl);
    // Array.from(document.getElementsByClassName('indterminate-parent-node')).forEach((node: any)=>{
    //   node.expand();
    //   this.treeControl.
    // })
  }

  initialize(List = []) {
    this.dataChange.next(this.buildTree(List));
  }

  buildTree(List): TodoItemNode[] {
    let ListTemp: TodoItemNode[] = [];
    List.forEach((e) => {
      const node = new TodoItemNode();
      node.id = e.id;
      node.displayName = e.displayName;
      node.urn = e.urn;
      node.href = e.href;
      node.type = e.type;
      node.children = e.children.length ? e.children : null;
      ListTemp.push(node);
    });
    return ListTemp;
  }

  checkLeaf(oNode: TodoItemNode | TodoItemFlatNode, value: boolean, List) {
    for (const tempNode of List) {
      if (tempNode) {
        tempNode.dtMaj = null;
        if (oNode.id === tempNode.id) {
          if (tempNode.isChecked == true) {
            return;
          }
          tempNode.isChecked = value;
          return;
        } else {
          if (!!tempNode.children?.length) {
            this.checkLeaf(oNode, value, tempNode.children);
          }
        }
      }
    }
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;


  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {

    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.id === node.id ? existingNode : new TodoItemFlatNode();
    flatNode.id = node.id;
    flatNode.displayName = node.displayName;
    flatNode.urn = node.urn;
    flatNode.href = node.href;
    flatNode.type = node.type;
    flatNode.isChecked = node.isChecked;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
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
    return descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  // todoItemSelectionToggle(node: TodoItemFlatNode, event): void {
  //   this.checklistSelection.toggle(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   this.checklistSelection.isSelected(node)
  //     ? this.checklistSelection.select(...descendants)
  //     : this.checklistSelection.deselect(...descendants);
  //
  //   // Force update for the parent
  //   descendants.forEach(child => this.checklistSelection.isSelected(child));
  //   this.checkAllParentsSelection(node);
  // }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode, event): void {
    this.checklistSelection.toggle(node);
    console.log('this.checklistSelection', this.checklistSelection);
    // this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  // checkAllParentsSelection(node: TodoItemFlatNode): void {
  //   let parent: TodoItemFlatNode | null = this.getParentNode(node);
  //   while (parent) {
  //     this.checkRootNodeSelection(parent);
  //     parent = this.getParentNode(parent);
  //   }
  // }

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
