import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

export default function Footer() {
  return (
    <div className="absolute w-full py-5 flex flex-col items-center justify-center">
      <div className="text-center text-gray-400 text-sm max-w-2xl [text-wrap:balance]">
        <b>Simple Insure</b> is not under the regulation of the Insurance Regulatory and Development Authority of India (IRDAI) and does not maintain partnerships or affiliations with any insurance companies.
      </div>
      {/* <div className='flex flex-row justify-center gap-2'>
        <a
          href="https://www.instagram.com/simple.insure/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex max-w-fit items-center justify-center space-x-2 rounded-lg py-2 transition-all duration-75 hover:scale-105"
        >
          <InstagramLogoIcon className="h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/company/simpleinsure"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex max-w-fit items-center justify-center space-x-2 rounded-lg py-2 transition-all duration-75 hover:scale-105"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
        </a>
      </div> */}
    </div>
  );
}
