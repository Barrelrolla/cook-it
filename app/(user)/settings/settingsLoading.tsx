import { Skeleton } from "barrelrolla-ui";
import SettingsBase from "./settingsBase";

export default function SettingsLoading() {
  return (
    <SettingsBase>
      <div className="flex flex-col gap-4 mt-4 p-4">
        <Skeleton className="h-6 w-60" />
        <Skeleton className="h-6 w-60" />
      </div>
    </SettingsBase>
  );
}
