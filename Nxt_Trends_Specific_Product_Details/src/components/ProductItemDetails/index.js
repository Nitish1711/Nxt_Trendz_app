import Header from '../Header'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const ProductItemDetails = () => {
  const {id} = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(1)

  const increment = () => {
    setCount(prevState => prevState + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setCount(prevState => prevState - 1)
    }
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      const apiUrl = `https://apis.ccbp.in/products/${id}`
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      try {
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const fetchedData = await response.json()
          console.log('Fetched Data:', fetchedData)
          setProductDetail(fetchedData)
        } else {
          throw new Error('Failed to fetch product details')
        }
      } catch (error) {
        console.error('Error fetching product details:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <div className='upper-product'>
        <div className='product-image'>
          <img
            src={productDetail.image_url}
            className='product-img'
            alt='product-img'
          />
        </div>
        <div className='product-details'>
          <h1 className='heading'>{productDetail.title}</h1>
          <h2 className='product-price'>
            <b>Rs {productDetail.price}/-</b>
          </h2>
          <div className='rating-review'>
            <div className='rating'> {productDetail.rating} &#9734;</div>
            <div> {productDetail.total_reviews} reviews </div>
          </div>
          <p>{productDetail.description}</p>
          <div>
            <b>Available:</b> {productDetail.availability}
          </div>
          <div>
            <b>Brand:</b> {productDetail.brand}
          </div>
          <div className='product-function'>
            <button className='decrement' onClick={decrement}>
              -
            </button>
            <div className='count-number'>{count}</div>
            <button className='increment' onClick={increment}>
              +
            </button>
          </div>
          <button className='cart-btn'>ADD TO CART</button>
        </div>
      </div>
    </>
  )
}

export default ProductItemDetails
