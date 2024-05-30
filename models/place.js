export class Place {
  constructor(
    title,
    description,
    imageUriC,
    location,
    date,
    user,
    id
  ) {
    this.title = title;
    this.description = description;
    this.imageUriC = imageUriC;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.141241, lng: 127.121 }
    this.date = date;
    this.user = user;
    this.id = id;
  }
}
