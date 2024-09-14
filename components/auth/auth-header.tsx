import Link from "next/link";

interface IProps {
  /**
   * Title of the auth header
   * @example Get Started with Ker Active
   */
  title: string;
  desc?: string;
  /**
   * href for the link if the auth header has a link
   */
  href?: string;
}
export const AuthHeader = ({ title, desc, href }: IProps) => {
  return (
    <header className='text-center'>
      <p className='text-[#1C1939] font-bold text-[25px]'>{title}</p>
      <div className='flex flex-row items-center justify-center gap-1'>
        <p className='font-sm'>{desc}</p>
        {href && (
          <Link className='font-sm text-brand font-medium' href={href}>
            Click here
          </Link>
        )}
      </div>
    </header>
  );
};
