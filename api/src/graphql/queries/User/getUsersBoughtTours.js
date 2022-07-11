// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';
import mongoose from 'mongoose';
import type { purchasedTours } from '../../schema/User/purchasedTours';
type GetToursArgs = {
  input: {
    recordsPerPage?: number,
    pageNumber?: number,
  },
};

type GetToursResponse = {
  totalPages: number,
  totalRecordsCount: number,
  tours: Array<TourMongooseRecord>,
};
export async function getUsersBoughtTours (
  _: void,
  args: void,
  ctx: any,
): Promise<GetToursResponse> {
  let usersBoughtTours = await ctx.db.Tour.find(
      {'purchasedTourIDs': { $not: { $size: 0}}},
      ctx,
    );
  return usersBoughtTours;
}
getUsersBoughtTours.typeDef = /* GraphQL */ `
  extend type Query {
    getUsersBoughtTours(input: GetUserToursInput!): GetUserToursResponse!
  }

  input GetUserToursInput {
    recordsPerPage: Int
    pageNumber: Int
  }

  type GetUserToursResponse implements PaginatedListResponse {
    totalPages: Int!
    totalRecordsCount: Int!
    tours: [Tour!]!
  }
`;