module.exports = {
  getVacations: async (options = {}) => {
    //fake vacations
    const vacations = [
      {
        name: "Hood River Day Trip",
        slug: "hood-river-day-trip",
        category: "Day Trip",
        sku: "HR199",
        description:
          "Spend a day sailing on the Columbia and " +
          "enjoying craft beers in Hood River!",
        location: {
          //i'll use this for geocoding later
          search: 'Hood River, USA', 
        },
        price: 99.95,
        tags: ["day trip", "hood river", "sailing", "windsurfing", "breweries"],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
      },
    ];
    //If the "available" option is specified, return only vacations that match
     if(options.available !== undefined){
        return vacations.filter(({available}) => available === options.available)
        return vacations;
     }
     addVacationInSeasonListener: async (email, sku) =>{
      //later...
     }
  }
};
