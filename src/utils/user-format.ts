/**
 * Formats API response data into the application's expected user data format
 * @param apiResponse The raw API response from the endpoint
 * @param IMAGES Reference to image assets
 * @returns Formatted user data object
 */
export const formatUserData = (response: any, img: string) => {
    if (!response) {
      return null;
    }
  
    const userData = response;
    
    // Map vaccination history to expected format
    const vaccinations = userData.vaccinationHistory.map((history: any) => {
      // Calculate expiration date (assuming 10 years from administration date)
      const administeredDate = new Date(history.administeredAt);
      const expiryDate = new Date(administeredDate);
      
      // Get validity period from vaccine data if available, or default to 10 years
      const validityPeriod = history.vaccine?.validty ? 
        parseInt(history.vaccine.validty.split('_')[0]) || 10 : 
        10;
        
      expiryDate.setFullYear(administeredDate.getFullYear() + validityPeriod);
      
      // Format date as MM/DD/YYYY
      const formattedExpiryDate = `${expiryDate.getMonth() + 1}/${expiryDate.getDate()}/${expiryDate.getFullYear()}`;
      
      return {
        name: history.vaccine?.vaccineName || "Unknown Vaccine",
        expiresOn: formattedExpiryDate
      };
    });
  
    // Extract birth year from DOB to calculate age
    const birthYear = userData.dob ? 
      parseInt(userData.dob.split('-')[0]) : 
      new Date().getFullYear() - 30; // Default age if DOB parsing fails
      
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
  
    // Transform the data into the expected format
    return {
      passportNumber: userData.passportNumber || "",
      firstName: userData.firstName || "",
      lastName: userData.surName || "", // Map surName to lastName
      middleName: "", // No middle name in API response
      age: age,
      stateOfOrigin: userData.state || "",
      yellowCardNumber: userData.yellowCardNumber || "",
      vaccines: userData.vaccines,
      totalVaccineCount: userData.totalVaccineCount,
      vaccineList: userData.vaccineList,
      vaccinations: vaccinations,
      // Use a default image if no photo is provided
      imageUrl: userData.photo || img || "", 
      // Additional data that might be useful
      userId: userData.userId,
      email: userData.email,
      phone: userData.phone,
      nin: userData.nin,
      address: userData.address,
      gender: userData.gender,
      isCompleted: userData.isCompleted,
      isVoid: userData.isVoid
    };
};