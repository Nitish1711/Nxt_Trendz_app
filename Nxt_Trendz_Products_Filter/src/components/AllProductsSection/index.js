import React, {useState, useEffect} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import FiltersGroup from '../FiltersGroup'
import ProductsHeader from '../ProductsHeader'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const AllProductsSection = () => {
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    responseData: null,
    errorMsg: null,
  })
  const [activeOptionId, setActiveOptionId] = useState(
    sortbyOptions[0].optionId,
  )
  const [selectedRatingId, setSelectedRatingId] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      setApiDetails({
        apiStatus: apiStatusConstants.inProgress,
        responseData: null,
        errorMsg: null,
      })
      const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${selectedCategoryId}&title_search=${selectedTitle}&rating=${selectedRatingId}`
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      try {
        const response = await fetch(apiUrl, options)
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const fetchedData = await response.json()

        let filteredData = fetchedData.products

        // console.log(filteredData)

        // if (selectedRatingId) {
        //   filteredData = filteredData.filter(
        //     product => product.rating >= selectedRatingId,
        //   )
        // }

        // if (selectedCategoryId) {
        //   filteredData = filteredData.filter(
        //     product => product.category === selectedCategoryId,
        //   )
        // }

        const formattedData = filteredData.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))

        setApiDetails({
          apiStatus: apiStatusConstants.success,
          responseData: formattedData,
          errorMsg: null,
        })
      } catch (error) {
        setApiDetails({
          apiStatus: apiStatusConstants.failure,
          responseData: null,
          errorMsg: error.message,
        })
      }
    }

    getProducts()
  }, [activeOptionId, selectedRatingId, selectedCategoryId])

  const handleRatingChange = ratingId => {
    setSelectedRatingId(ratingId)
  }

  const handleCategoryChange = categoryId => {
    setSelectedCategoryId(categoryId)
  }

  const renderLoadingView = () => (
    <div className='products-loader-container'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  const filterClearer = () => {
    setSelectedCategoryId(null)
    setSelectedRatingId(null)
  }

  const renderFailureView = () => (
    <div className='products-error-view-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png'
        alt='all-products-error'
        className='products-failure-img'
      />
      <h1 className='product-failure-heading-text'>
        Oops! Something Went Wrong
      </h1>
      <p className='products-failure-description'>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  const renderProductsListView = () => {
    const {responseData} = apiDetails

    return (
      <div className='all-products-container'>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={setActiveOptionId}
        />
        <ul className='products-list'>
          {responseData.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  const renderAllProducts = () => {
    const {apiStatus} = apiDetails
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className='all-products-section'>
      <FiltersGroup
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        ratingChanger={handleRatingChange}
        categoryChanger={handleCategoryChange}
        filterClearer={filterClearer}
      />
      {renderAllProducts()}
    </div>
  )
}

export default AllProductsSection
