interface LocationMapProps {
  lat: number;
  lng: number;
  label?: string;
  description?: string;
}

const LocationMap = ({ lat, lng, label, description }: LocationMapProps) => (
  <div className="h-[160px] rounded-lg overflow-hidden border grayscale">
    <iframe className="w-full h-full pointer-events-none" src={`https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`} />
  </div>
);

export default LocationMap;
