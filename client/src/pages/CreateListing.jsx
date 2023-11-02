import ListingForm from '../components/ListingForm';

export default function CreateListing() {
  return (
    <main className='max-w-7xl px-4 mx-auto'>
      <h1 className='title'>Bring a product to the market</h1>
      <ListingForm type='create' />
    </main>
  );
}
