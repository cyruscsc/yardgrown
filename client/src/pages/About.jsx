import { aboutPageText } from '../text';
import sharing from '../assets/sharing.jpg';

export default function About() {
  return (
    <main className=''>
      <img
        src={sharing}
        alt='Sharing'
        className='w-full h-[32rem] object-cover object-center'
      />
      <article className='flex flex-col items-center justify-center gap-4 max-w-3xl mx-auto px-4 py-8'>
        {aboutPageText.map((text, index) => (
          <div key={index}>
            <h1 className='title'>{text.heading}</h1>
            <p>{text.paragraph}</p>
          </div>
        ))}
      </article>
    </main>
  );
}
