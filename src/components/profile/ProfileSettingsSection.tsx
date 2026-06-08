import { ProfileSection } from "@/components/profile/ProfileSection";
import { ProfileSettingsRow } from "@/components/profile/ProfileSettingsRow";

type Props = {
  email: string;
  onChangeEmail: () => void;
  onManageSubscription: () => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
};

export function ProfileSettingsSection({
  email,
  onChangeEmail,
  onManageSubscription,
  onDeleteAccount,
  onSignOut,
}: Props) {
  return (
    <ProfileSection title="Settings">
      <div className="-mx-1">
        <ProfileSettingsRow
          label="Change email"
          value={email}
          onClick={onChangeEmail}
        />
        <ProfileSettingsRow
          label="Manage subscription"
          hint="View plan and billing"
          onClick={onManageSubscription}
        />
        <ProfileSettingsRow
          label="Sign out"
          showChevron={false}
          onClick={onSignOut}
        />
        <ProfileSettingsRow
          label="Delete account"
          hint="Permanently remove your data"
          destructive
          showChevron={false}
          onClick={onDeleteAccount}
        />
      </div>
    </ProfileSection>
  );
}
