# User Service Guide

This document explains how to use the user service functionality that has been added to the application.

## New Functionality

A new method `getUserList` has been added to the `userService` to fetch a paginated list of users from the API endpoint `http://localhost:5232/api/Users`.

## Usage

### 1. Import the Service

```typescript
import { userService } from '@/services/user/user.service';
```

### 2. Fetch User List

```typescript
// Fetch first page with default page size (10)
const response = await userService.getUserList();

// Fetch specific page with custom page size
const response = await userService.getUserList(2, 20);
```

### 3. Handle the Response

The response follows this structure:

```typescript
interface UserListResponse {
  code: number;
  message: string;
  data: {
    items: UserProfile[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
```

## Component Integration

A `UserList` component has been created at `src/components/UserList.tsx` that demonstrates how to use the service:

1. It fetches users using the `getUserList` method
2. It displays users in a grid layout
3. It includes pagination controls

## Page Integration

A users page has been created at `src/app/users/page.tsx` that uses:
1. The `UserList` component to display users
2. `ProtectedRoute` to ensure only authenticated users can access it
3. Standard layout components (`Header`, `Footer`)

## Navigation

A link to the users page has been added to the main navigation in the header component.

## API Response Structure

The API returns data in this format:

```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "items": [...],
    "totalCount": 3,
    "pageIndex": 1,
    "pageSize": 10,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

Each user object contains:
- id
- nickName
- avatar
- gender
- birthDate
- age
- email
- userName
- password
- phoneNumber
- address
- createdAt
- updatedAt
- active
- deleted
- deletedBy
- deletedAt
- createdBy
- updatedBy