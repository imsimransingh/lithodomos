import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { isConstructorDeclaration } from 'typescript'
import { LITHODOMOS_TEST_GetToursForHomeScreen as Data } from './__generated__/LITHODOMOS_TEST_GetToursForHomeScreen'
import Box from '@material-ui/core/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Button from '@mui/material/Button'
import { selectIsAuthenticated } from '../../store/app/selectors'

const GET_TOURS = gql`
  query LITHODOMOS_TEST_GetToursForHomeScreen {
    result: getTours(input: {}) {
      tours {
        id
        name
        priceUSDCents
        thumbnailURL
        purchased
      }
    }
  }
`

const PURCHASE_ITEM = gql`
  mutation LITHODOMOS_TEST_GetToursForHomeScreen($input: PurchaseToursInput!) {
    result: purchaseTours(input: $input) {
      purchasedTours {
        id
        name
      }
    }
  }
`

export const Tours: React.FC = () => {
  const { loading, data, error } = useQuery<Data, null>(GET_TOURS)
  const [purchaseItem] = useMutation(PURCHASE_ITEM)

  // is user Authenticated
  const isAuthed = useSelector(selectIsAuthenticated)

  // handle Purchase Item  will be called when user click on purchade button
  const handlePurchaseItem = input => {
    const ItemsBought = purchaseItem({
      variables: { input: { tourIDs: [input] } }
    })
  }

  const restrictUser = () => {
    alert('Please login first to buy this item!')
  }

  let result
  if (loading && !data?.result) {
    result = <p>Loading...</p>
  } else if (error) {
    result = <p>Error: {error?.message || 'Unknown'}</p>
  } else {
    const tours = data?.result?.tours || []

    result = tours.map(data => {
      return (
        <>
          <Card key={data.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                image={
                  data.thumbnailURL
                    ? data.thumbnailURL
                    : 'https://i.ibb.co/YZ7nkX9/valencia.jpg'
                }
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {data.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since: 
                 <b> ${data.priceUSDCents} </b>
                </Typography>
                <Box mt={3}>
                  {isAuthed ? (
                    <Button
                      onClick={() => handlePurchaseItem(data.id)}
                      variant='outlined'
                    >
                      Purchase
                    </Button>
                  ) : (
                    <Button onClick={() => restrictUser()} variant='outlined'>
                      Purchase
                    </Button>
                  )}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )
    })
  }

  return (
    <Wrapper>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {result}
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;

  > * {
    margin-bottom: 20px;
  }
`
