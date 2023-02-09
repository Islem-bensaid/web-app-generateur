import { Pagination } from './Pagination';
import { Sort } from './Sort';
import { CriteriaSearch } from './CriteriaSearch';

export class SearchObject {
	pagination: Pagination ;
	sort: Sort = new Sort();
	listSort: Array<Sort> = [];
	dataSearch: Array<CriteriaSearch> = [];
	listCol: string[]= [];

	constructor() {
	}

	static nmSearchObject() {
		const searchObject = new SearchObject()
		searchObject.sort = new Sort('ordre', 'asc nulls last')
		searchObject.listCol = ['id', 'code', 'libelleAr', 'libelleFr', 'libelleEn'];
		return searchObject;
	}
}

