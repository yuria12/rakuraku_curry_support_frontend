import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { PageContainer } from "@/components/common/PageContainer";
import { getUserProfileData } from "@/lib/user-profile-data";

const profileFields = [
  { key: "name", label: "氏名" },
  { key: "email", label: "メールアドレス" },
  { key: "postalCode", label: "郵便番号" },
  { key: "address", label: "住所" },
  { key: "phone", label: "電話番号" },
] as const;

export default async function AccountPage() {
  const profile = await getUserProfileData();

  return (
    <PageContainer className="account-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "アカウント情報" },
        ]}
      />

      <div className="account-page__header">
        <div>
          <p className="account-page__eyebrow">Account</p>
          <h1>登録情報</h1>
        </div>
      </div>

      <Card className="account-profile-card">
        <div className="account-profile-card__body">
          <dl className="account-profile-list">
            {profileFields.map((field) => (
              <div className="account-profile-list__row" key={field.key}>
                <dt>{field.label}</dt>
                <dd>{profile[field.key] || "未登録"}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="account-profile-card__footer">
          <p>登録内容の変更は準備中です。</p>
          {/* TODO: バックエンド側のユーザー情報更新APIが実装されたら、編集機能を追加する */}
          {/* TODO: 編集ボタン押下時にユーザー情報編集画面へ遷移、または編集フォームを表示する */}
          <Button disabled type="button">
            編集する
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}
