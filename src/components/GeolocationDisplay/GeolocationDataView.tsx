import { Geolocation } from 'api/geolocation';

type Props = {
  geolocation?: Geolocation;
};

function GeolocationDataView({ geolocation }: Props) {
  if (!geolocation) throw new Error('No geolocation to render');

  const { country, city } = geolocation;
  return (
    <>
      <div>
        Country: <span>{country}</span>
      </div>
      <div>
        City: <span>{city}</span>
      </div>
    </>
  );
}

export default GeolocationDataView;
