import { memo } from 'react'
import propTypes from 'prop-types'

const Contacts = memo((props) => {
  if(!props || !props.socialMedia) {
    return null
  }
  const {socialMedia, phone, location, email, title} = props

  return (
    <footer id='contact1' className="bg-[#050d24b0] text-white py-12 flex flex-col justify-center items-center">
      {title && <h2 className="text-4xl font-bold mb-6 w-fit text-center underline hover:scale-[1.1] transition-all duration-400">{title}</h2>}
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Endereço */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Endereço</h3>
            <p>{location.address}</p>
            <p>
              {location.city}, {location.state}
            </p>
            <p>CEP: {location.zipCode}</p>
          </div>

          {/* Contatos */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contatos</h3>
            <p>
              Telefone:{' '}
              <a href={`tel:${phone}`} className="text-blue-400 hover:text-blue-500">
                {phone}
              </a>
            </p>
            <p>
              Email:{' '}
              <a href={`mailto:${email}`} className="text-blue-400 hover:text-blue-500">
                {email}
              </a>
            </p>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Redes Sociais</h3>
            <ul>
              {socialMedia.map((social) => (
                <li key={social._key}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
})

Contacts.displayName = "Contacts"
Contacts.propTypes = {}
export default Contacts
