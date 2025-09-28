/**
 * Test file for user service update functionality
 * This file demonstrates how to use the updateProfile method
 */

import { userService, UpdateProfileData } from './user.service';

// Example usage of updateProfile method
async function testUpdateProfile() {
  try {
    // Sample data similar to your curl request
    const profileData: UpdateProfileData = {
      nickName: "string",
      avatar: "string",
      gender: 0,
      birthDate: "2025-09-28T06:29:09.937Z",
      age: 0,
      email: "string",
      phoneNumber: "string",
      address: "string"
    };

    console.log("Updating profile with data:", profileData);
    
    // Call the updateProfile method
    const result = await userService.updateProfile(profileData);
    
    console.log("Profile updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
}

// Export for use in other files
export { testUpdateProfile };

// If running directly (node environment), execute the test
if (typeof window === 'undefined') {
  // This would run in a Node.js environment
  // testUpdateProfile();
}

export default testUpdateProfile;