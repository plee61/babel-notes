const filters = {
    searchText: '',
    sortBy: 'edited'
}
const getFilters = () => filters
const setFilters = (updates) => {
    if (typeof filters.searchText === 'string'){
        filters.searchText = updates.searchText    
    }
    if (typeof filters.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}
export {getFilters, setFilters}