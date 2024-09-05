# apace-systems-mobile
Cross-Platform Mobile App for Apace Systems - Elevator components manufacturer.

## Technologies Used
- React Native
- Expo
- Apollo Client (for GraphQL integration)

## Setup Instructions
1. Install Node.js (version 14 or higher)
2. Install Expo CLI:
   ```
   npm install -g expo-cli
   ```
3. Clone the repository:
   ```
   git clone https://github.com/apacesystems/apace-systems-mobile.git
   ```
4. Navigate to the project directory:
   ```
   cd apace-systems-mobile
   ```
5. Install dependencies:
   ```
   npm install
   ```
6. Set up environment variables:
   - Create a `.env` file in the project root
   - Add the following variable:
     ```
     REACT_APP_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
     ```
     Replace `http://localhost:3000/graphql` with the URL of your GraphQL endpoint if different.
7. Start the development server:
   ```
   expo start
   ```
   
This will open the Expo Developer Tools in your browser. You can then run the app on an iOS or Android simulator/device using the provided options.

## Project Structure
The mobile app project is structured as follows:

- `apollo/client.js`: Configuration for the Apollo Client
- `app/`: Contains the main screens and navigation setup
- `components/`: Reusable components used throughout the app
- `assets/`: Static assets such as images and fonts
- `constants/`: Constants used in the app
- `hooks/`: Custom hooks used in the app

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.