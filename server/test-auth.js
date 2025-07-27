// Simple test script to check authentication endpoints
const axios = require('axios');

const API_BASE = process.env.API_BASE || 'https://elearning-c9yc.onrender.com';

async function testAuth() {
  console.log('Testing authentication endpoints...');
  
  try {
    // Test 1: Check if server is running
    console.log('\n1. Testing server availability...');
    const healthCheck = await axios.get(`${API_BASE}/`);
    console.log('✅ Server is running:', healthCheck.status);
    
    // Test 2: Test login endpoint (this will fail but should return proper error)
    console.log('\n2. Testing login endpoint...');
    try {
      const loginResponse = await axios.post(`${API_BASE}/login`, {
        email: 'test@test.com',
        password: 'wrongpassword'
      });
      console.log('❌ Login should have failed but succeeded:', loginResponse.status);
    } catch (error) {
      if (error.response) {
        console.log('✅ Login endpoint working (expected error):', error.response.status, error.response.data.message);
      } else {
        console.log('❌ Login endpoint error:', error.message);
      }
    }
    
    // Test 3: Test Google OAuth endpoint
    console.log('\n3. Testing Google OAuth endpoint...');
    try {
      const googleResponse = await axios.get(`${API_BASE}/auth/google`);
      console.log('✅ Google OAuth endpoint accessible:', googleResponse.status);
    } catch (error) {
      if (error.response && error.response.status === 302) {
        console.log('✅ Google OAuth redirecting (expected):', error.response.status);
      } else {
        console.log('❌ Google OAuth endpoint error:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuth(); 