import React from 'react'
import './Filters.css'

const Filters = ({setSortBy, expenseCategories,departmentOptions, serviceOptions, sourceOptions, filterValues, setFilterValues, setSearchText}) => {
  return (
    <>
    <div className='filter-div'>
        <label htmlFor="searchFilter">Search </label>
        <input placeholder='Search remarks, amount' type="text" name="" id="searchFilter" onChange={(e)=>setSearchText(e.target.value)} />
        <label htmlFor="categoryFilter">Category </label>
        <select name="" id="categoryFilter" onChange={(e)=>setFilterValues({...filterValues,categoryF:e.target.value})}>
            <option value="All" defaultValue>All</option>
        {expenseCategories.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
        </select>

        <label htmlFor="typeFilter">Type </label>
        <select name="" id="typeFilter" onChange={(e)=>setFilterValues({...filterValues,typeF:e.target.value})}>
        <option value="All" defaultValue>All</option>
        {departmentOptions.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
        </select>

        <label htmlFor="serviceFilter">Service </label>
        <select name="" id="serviceFilter" onChange={(e)=>setFilterValues({...filterValues,serviceF:e.target.value})}>
        <option value="All" defaultValue>All</option>
        {serviceOptions.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
        </select>

        <label htmlFor="sourceFilter">Source </label>
        <select name="" id="sourceFilter" onChange={(e)=>setFilterValues({...filterValues,sourceF:e.target.value})}> 
        <option value="All" defaultValue>All</option>
        {sourceOptions.map((options) => (
                            <option key={options} value={options}>
                              {options}
                            </option>
                          ))}
        </select>
        <label htmlFor="sort-by">Sort By </label>
        <select name="" id="sort-by" onChange={(e)=>setSortBy(e.target.value)}>
          <option value='date' defaultValue>Date incurred</option>
          <option value='amount'>Amount</option>
          <option value='createdAt'>Date added</option>
        </select>
    </div>
    </>
  )
}

export default Filters