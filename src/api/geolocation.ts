type GeolocationResponse = Geolocation;

export type Geolocation = {
  country: string;
  city: string;
};

export async function geolocate(): Promise<Geolocation> {
  return fetch('http://ip-api.com/json')
    .then((resp) => {
      return resp.json();
    })
    .then((data: GeolocationResponse) => {
      return transformResponse(data);
    });
}

function transformResponse({ country, city }: GeolocationResponse): Geolocation {
  if (!country || !city) throw new Error('I could not find you :(');

  return {
    city,
    country
  };
}
