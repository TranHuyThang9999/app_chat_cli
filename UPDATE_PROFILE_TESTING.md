# Profile Update Testing Guide

This document explains how to test the profile update functionality that was added to the application.

## Added Components

1. **Update Profile Method** - Added to [src/services/user/user.service.ts](file:///c:/projects/app_chat/app_chat_cli/src/services/user.service.ts)
2. **Test Update Profile Component** - Created at [src/components/TestUpdateProfile.tsx](file:///c:/projects/app_chat/app_chat_cli/src/components/TestUpdateProfile.tsx)
3. **Test Page** - Created at [src/app/test-update-profile/page.tsx](file:///c:/projects/app_chat/app_chat_cli/src/app/test-update-profile/page.tsx)
4. **Navigation Link** - Added to the header component

## How to Test

### 1. Using the Test Page (Recommended)

1. Start the application:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000

3. Log in with valid credentials

4. Click on "Test Update" in the navigation bar

5. Fill in the profile information you want to update

6. Click "Update Profile" to send the request

7. View the response in the result section below the form

### 2. Using the Service Method Directly

You can also use the updateProfile method directly in your components:

```typescript
import { userService, UpdateProfileData } from '@/services/user/user.service';

// Example usage
const profileData: UpdateProfileData = {
  nickName: "New Nickname",
  email: "newemail@example.com",
  // ... other fields
};

try {
  const result = await userService.updateProfile(profileData);
  console.log("Profile updated:", result);
} catch (error) {
  console.error("Update failed:", error);
}
```

### 3. Using Curl (as in your example)

You can continue to use your curl command to test the API directly:

```bash
curl --location --request PATCH 'http://localhost:5232/api/Users/profile' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN_HERE' \
--data '{
  "nickName": "string",
  "avatar": "string",
  "gender": 0,
  "birthDate": "2025-09-28T06:29:09.937Z",
  "age": 0,
  "email": "string",
  "phoneNumber": "string",
  "address": "string"
}'
```

## API Response Format

The API returns data in this format:

```json
{
  "code": 0,
  "message": "Profile updated successfully",
  "data": {
    "nickName": "string",
    "avatar": "string",
    "gender": 0,
    "birthDate": "2025-09-28T06:29:09.937Z",
    "age": 0,
    "email": "string",
    "userName": "admin",
    "password": "$2a$11$fNQ8hLD6cC1HIvr4NnlUnuexfhJBlGR4qLtvdBHEa8lPRLS3Seo0e",
    "phoneNumber": "string",
    "address": "string",
    "id": 3,
    "createdAt": "2025-09-27T11:06:09.175344Z",
    "updatedAt": "2025-09-28T06:30:15.3660818Z",
    "active": true,
    "deleted": false,
    "deletedBy": null,
    "deletedAt": null,
    "createdBy": 0,
    "updatedBy": 3
  }
}
```

## Error Handling

The service properly handles errors:
- Network errors
- API errors (non-2xx responses)
- Validation errors from the server

All errors are thrown as JavaScript Error objects with descriptive messages.