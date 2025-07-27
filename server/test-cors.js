const axios = require('axios');

const API_BASE = process.env.API_BASE || 'http://localhost:4200';

async function testCORS() {
  console.log('Testing CORS configuration...\n');

  try {
    // Test 1: Simple GET request
    console.log('1. Testing simple GET request...');
    const getResponse = await axios.get(`${API_BASE}/`);
    console.log('✅ GET request successful:', getResponse.status, getResponse.data);

    // Test 2: POST request to login endpoint
    console.log('\n2. Testing POST request to login...');
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

    // Test 3: OPTIONS request (preflight)
    console.log('\n3. Testing OPTIONS request...');
    try {
      const optionsResponse = await axios.options(`${API_BASE}/login`);
      console.log('✅ OPTIONS request successful:', optionsResponse.status);
      console.log('CORS Headers:', {
        'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
        'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
        'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers']
      });
    } catch (error) {
      console.log('❌ OPTIONS request failed:', error.message);
    }

    // Test 4: Test with Authorization header
    console.log('\n4. Testing request with Authorization header...');
    try {
      const authResponse = await axios.get(`${API_BASE}/profile`, {
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });
      console.log('❌ Auth request should have failed but succeeded:', authResponse.status);
    } catch (error) {
      if (error.response) {
        console.log('✅ Auth request working (expected error):', error.response.status, error.response.data.message);
      } else {
        console.log('❌ Auth request error:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    }
  }
}

testCORS(); 