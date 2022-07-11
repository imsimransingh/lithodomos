import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { isConstructorDeclaration } from 'typescript'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
import { LITHODOMOS_TEST_GetCurrentUser as userData } from './__generated__/LITHODOMOS_TEST_GetCurrentUser'

import { LITHODOMOS_TEST_GetToursForHomeScreen as Data } from '../../HomeRoutes/__generated__/LITHODOMOS_TEST_GetToursForHomeScreen'

import { selectIsAuthenticated } from '../../../store/app/selectors'

const GET_CURRENT_USER_DETAILS = gql`
  query LITHODOMOS_TEST_GetCurrentUser {
    result: getCurrentUser(input: {}) {
      id
      name
      purchasedTours {
        id
      }
      purchasedTourItems {
        id
        name
        priceUSDCents
      }
    }
  }
`

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

export const AccountView: React.FC = () => {
  const isAuthed = useSelector(selectIsAuthenticated)
  const { data }= useQuery<userData, null>(
    GET_CURRENT_USER_DETAILS
  )
  const { purchaseItem } = useQuery<Data, null>(GET_TOURS)
 
  let arrOfPurchasedItems: any = []
  if (data?.result?.purchasedTours?.length > 0) {
    arrOfPurchasedItems = data?.result?.purchasedTours.map(d => d.id)
    const ItemsBought = purchaseItem({
      variables: { input: { tourIDs: arrOfPurchasedItems } }
    })
  }

  const tours = data?.result?.tours || []
  let result
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                {data.priceUSDCents}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    )
  })

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
  padding: 10px;
  margin: 0 auto;

  > * {
    margin-bottom: 20px;
  }
`
