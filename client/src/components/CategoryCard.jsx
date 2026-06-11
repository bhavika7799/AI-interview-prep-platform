function CategoryCard(props) {
  return (
    <div
      onClick={props.onSelect}
      className="bg-white p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition"
    >
      <h3 className="text-xl font-semibold">
        {props.title}
      </h3>

      <p className="text-gray-500 mt-2">
        {props.description}
      </p>
    </div>
  );
}

export default CategoryCard;