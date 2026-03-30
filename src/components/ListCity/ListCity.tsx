interface ListCityProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function ListCity({ cities, selectedCity, onCityChange }: ListCityProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city} onClick={() => onCityChange(city)}>
          <a
            className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}
            href="#"
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
