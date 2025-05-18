'use client';
import Image from 'next/image';
import { Header } from '@/components';
import { useRouter } from 'next/navigation';
import { useUserInfo } from './useUserInfo';
export default function MyProfile() {
  const router = useRouter();
  const { data, isLoading, isError } = useUserInfo();
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleWithdrawalClick = () => {
    alert('탈퇴 기능은 아직 준비중입니다.');
    // router.push("/withdrawal");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="w-full h-[800px] relative overflow-hidden">
      <div className="w-full h-full relative">
        {/*헤더 영역*/}
        <Header
          title="나의 프로필"
          left={
            <Image
              src="/arrow_left.svg"
              alt="arrow-left"
              width={18}
              height={15}
            />
          }
          onLeftClick={() => {
            router.back();
          }}
        />

        <div className="flex flex-col px-[30px] pt-[100px] w-full h-full">
          <ProfileWrapper title="내 정보">
            <div className="gap-4 flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <div className="text-gray-500">연결된 계정</div>
                <div className="text-gray-500">{data?.email}</div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="text-gray-500">성별</div>
                <div className="text-gray-500">{data?.gender === 'M' ? '남자' : '여자'}</div>
              </div>
            </div>
          </ProfileWrapper>

          <div className="h-[1px] bg-gray-200 w-full my-[24px]"></div>

          <ProfileWrapper title="서비스 지원">
            <div className="gap-4 flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <button
                  className="text-gray-500"
                  onClick={handleLogoutClick}
                >
                  로그아웃
                </button>
              </div>

              <div className="flex flex-row items-center justify-between">
                <button
                  className="text-gray-500"
                  onClick={handleWithdrawalClick}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </ProfileWrapper>
        </div>
      </div>
    </div>
  );
}

const ProfileWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <>
      <div className="items-center font-bold text-lg mb-[20px]">{title}</div>
      {children}
    </>
  );
};
