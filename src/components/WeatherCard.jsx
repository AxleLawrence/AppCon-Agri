const WeatherCard = ({ title, value, color }) => {
    const bgColor =
      color === "blue"
        ? "bg-blue-100"
        : color === "green"
        ? "bg-green-100"
        : "bg-yellow-100";
  
    return (
      <div className={`p-4 rounded-xl shadow-md ${bgColor}`}>
        <h3 className="text-gray-700 text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    );
  };
  
  export default WeatherCard;
  