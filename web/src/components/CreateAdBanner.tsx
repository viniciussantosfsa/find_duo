import { MagnifyingGlassPlus } from "phosphor-react"
import * as Diolog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>

          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <Diolog.Trigger className='py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
          </Diolog.Trigger>

        </div>
      </div>
    )
}