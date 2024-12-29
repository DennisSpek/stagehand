import Image from 'next/image';
import { ImageContainer } from '@/ui/imagePlaceholder';

interface ISearchResultModal {
  searchResults: any[];
  onItemSelect: (item: { artistId: string, image: string, name: string }) => void;
}

export const SearchResultModal = ({ searchResults, onItemSelect } : ISearchResultModal) => {
  return (
    <div className='w-full max-w-[480px] flex flex-col px-4 py-[7px] divide-y bg-lightGray gap-2 rounded-normal absolute top-full z-10'>
      {searchResults?.map((result, index) => (
        <div key={index} className='' onClick={() => onItemSelect({ artistId: result.id, image: result?.images[0]?.url, name: result.name})}>
          <SearchResultItem result={result}/>
        </div>
      ))}
    </div>
  )
}

const SearchResultItem = ({ result }: { result: { name: string, images: { url: string}[]}}) => {
  const image = result?.images[0]?.url ?? null;
  
  return (
    <div className='flex items-center gap-2 p-2 hover:bg-gray transition duration-300 cursor-pointer'>
      <div className='w-8 h-8 rounded-full relative'>
        {image ? (
          <Image src={image} alt='Picture of Artist' fill={true} className='rounded-full' sizes="(max-width: 16px) 100vw"/>
        ) : (
          <ImageContainer type='circle'/>
        )}
      </div>
      <span>{result.name}</span>
    </div>
  )
}