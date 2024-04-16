//Filter.js
import React from 'react'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    ratingChanger,
    categoryChanger,
    filterClearer,
  } = props

  const namesList = categoryOptions.map(option => option.name)
  const ratingsLists = ratingsList.map(star => ({
    ratingId: star.ratingId,
    imageUrl: star.imageUrl,
  }))

  const handleRatingClick = rating => {
    ratingChanger(rating)
  }

  const handleCategoryClick = categoryId => {
    categoryChanger(categoryId)
  }

  const handleClearFilters = () => {
    filterClearer()
  }

  return (
    <div className='filters-group-container'>
      <div className='category-filtering'>
        <h1>Category</h1>
        {namesList.map((name, index) => (

          <ul key={index} onClick={() => handleCategoryClick(index + 1)}>
            {name}
          </ul>
          
        ))}
      </div>
      <div className='rating-filtering'>
        <h1>Rating</h1>
        {ratingsLists.map((star, index) => (
          <div key={index} className='rating-item'>
            <img
              src={star.imageUrl}
              alt={`Star ${index}`}
              data-rating-id={star.ratingId}
              onClick={() => handleRatingClick(star.ratingId)}
            />
            <span style={{fontFamily: 'Roboto'}}>{star.ratingId} & up</span>
          </div>
        ))}
      </div>
      <button className='clear-filters' onClick={handleClearFilters}>
        <b>Clear Filters</b>
      </button>
    </div>
  )
}

export default FiltersGroup
