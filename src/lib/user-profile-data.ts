import { resolveDataSource } from "@/lib/api/data-source";
import { getCurrentUserProfile } from "@/lib/api/user";
import type { ApiUser, ApiUserProfile } from "@/lib/api/types";
import {
  getBackendSessionRequestInit,
  requireAuth,
} from "@/lib/auth-session";

export type UserProfileData = Readonly<{
  address: string;
  email: string;
  name: string;
  phone: string;
  postalCode: string;
}>;

const mockProfile: UserProfileData = {
  address: "東京都千代田区丸の内1-1-1",
  email: "user@example.com",
  name: "テストユーザー",
  phone: "090-1234-5678",
  postalCode: "100-0005",
};

function formatPostalCode(postalCode: string) {
  if (/^\d{7}$/.test(postalCode)) {
    return `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;
  }

  return postalCode;
}

function mapApiProfileToData(profile: ApiUserProfile): UserProfileData {
  return {
    address: profile.address,
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
    postalCode: formatPostalCode(profile.postalCode),
  };
}

function mapSessionUserToData(user?: ApiUser): UserProfileData {
  return {
    ...mockProfile,
    email: user?.email ?? mockProfile.email,
    name: user?.name ?? mockProfile.name,
  };
}

export async function getUserProfileData(): Promise<UserProfileData> {
  const session = await requireAuth("/login?redirectTo=/account");

  return resolveDataSource<UserProfileData>({
    api: async () =>
      mapApiProfileToData(
        await getCurrentUserProfile(await getBackendSessionRequestInit()),
      ),
    mock: () => mapSessionUserToData(session.user),
  });
}
