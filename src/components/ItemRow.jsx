import { fmt } from '../data/menu'

export default function ItemRow({ item, accentColor, image }) {
  return (
    <div className="item-row group">
      <div className="flex-1 pr-3 min-w-0">
        <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-hotel-800 transition-colors">
          {item.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
          {item.desc}
        </p>
        <span
          className="price-badge mt-2 inline-block"
          style={{
            color: accentColor,
            borderColor: accentColor + '40',
            backgroundColor: accentColor + '12',
          }}
        >
          {fmt(item.price)}
        </span>
      </div>
      {image && (
        <img
          src={image}
          alt={item.name}
          className="w-20 h-16 rounded-xl object-cover shrink-0 ml-2 shadow-sm transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>
  )
}
