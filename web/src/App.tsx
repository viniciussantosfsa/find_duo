import { useState, useEffect } from 'react';
import * as Diolog from '@radix-ui/react-dialog';
import axios from 'axios';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { GamerBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:8686/games')
      .then(response => {
        setGames(response.data)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  return (

    <div className='max-w-[1300px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo-marca" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>DUO</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'> {games.map(game => {
        return (
          <GamerBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        )
      })}
      </div>

      <Diolog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Diolog.Root>
    </div>
  )
}

export default App