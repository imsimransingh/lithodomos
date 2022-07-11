/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LITHODOMOS_TEST_GetCurrentUser
// ====================================================

export interface LITHODOMOS_TEST_GetCurrentUser_result_tours {
    __typename: "users";
    id: string;
    purchasedTourIDs: any;
    purchasedTourItems: any;
    email: string;
    name: string;
  }
  
  export interface LITHODOMOS_TEST_GetCurrentUser_result {
    __typename: "GetUserResponse";
    tours: LITHODOMOS_TEST_GetCurrentUser_result_tours[];
  }
  
  export interface LITHODOMOS_TEST_GetCurrentUser {
    result: LITHODOMOS_TEST_GetCurrentUser_result;
  }
  