// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';
import mongoose from 'mongoose';
import type { purchasedTours } from '../../schema/User/purchasedTours';
type GetToursResponse = {
  totalPages: number,
  totalRecordsCount: number,
  tours: Array<TourMongooseRecord>,
};
export async function getCurrentUser (
  _: void,
  args: void,
  ctx: any,
): Promise<GetToursResponse> {
  const userID = ctx.user?.id;

  if (!userID) {
    return null;
  }
  let user = await ctx.db.User.findByID(userID);
  if (user) {
    purchasedTours = await ctx.db.Tour.find(
      {
        _id: {
          $in: user?.purchasedTourIDs,
        },
      },
      ctx,
    );
    
  }
  return user;
}
getCurrentUser.typeDef = /* GraphQL */ `
  extend type Query {
    getCurrentUser(input: GetCurrentUserInput!): User
  }

  input GetCurrentUserInput {
    """
    dummy field.
    """
    _: Boolean
  }
`;
