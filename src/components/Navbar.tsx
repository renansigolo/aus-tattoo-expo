const menuItems = [
  {
    label: 'Home',
    url: '#',
  },
  {
    label: 'Visiting',
    url: '#',
  },
  {
    label: 'Exhibiting',
    url: '#',
  },
  {
    label: 'Artists',
    url: '#',
  },
  {
    label: 'Shop',
    url: '#',
  },
  {
    label: 'News',
    url: '#',
  },
  {
    label: 'About',
    url: '#',
  },
  {
    label: 'Contact',
    url: '#',
  },
]

// Top navbar
export default function Navbar() {
  return (
    <nav className="container">
      <ul>
        <li>
          <img
            src="https://placeholder.pics/svg/300/DEDEDE/555555/Logo%20300x300"
            alt="Logo"
            width={24}
            height={24}
          />
        </li>
      </ul>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </nav>
  )
}
