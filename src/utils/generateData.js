import { faker } from '@faker-js/faker';
import { generateInitialsAvatar } from './avatarUtils';

// A cache to store the generated data so we don't regenerate it on every render.
let customers = null;

export const generateCustomers = (count = 1000000) => {
  // If we've already generated the data, return the cached version.
  if (customers) {
    return customers;
  }

  console.log("Generating 1 million records... Please wait."); 
  
  // Generate an array of customer objects.
  const generatedCustomers = Array.from({ length: count }, (_, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`; 
    
    return {
      id: index + 1,
      name,
      phone: faker.phone.number(),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      score: faker.number.int({ min: 0, max: 100 }),
      lastMessageAt: faker.date.past(),
      addedBy: faker.person.fullName(),
      avatar: generateInitialsAvatar(name),
    };
  });
  
  console.log("Data generation complete.");
  customers = generatedCustomers; // Cache the generated data
  return customers;
};