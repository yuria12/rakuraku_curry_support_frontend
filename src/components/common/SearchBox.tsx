import { Button } from "@/components/common/Button";

type SearchBoxProps = Readonly<{
  id: string;
  label: string;
  name: string;
  placeholder: string;
}>;

export function SearchBox({ id, label, name, placeholder }: SearchBoxProps) {
  return (
    <form className="search-box" role="search">
      <label className="search-box__label" htmlFor={id}>
        {label}
      </label>
      <div className="search-box__control">
        <span className="search-box__icon" aria-hidden="true" />
        <input id={id} name={name} placeholder={placeholder} type="text" />
      </div>
      <Button size="sm" type="submit">
        検索
      </Button>
      <Button size="sm" type="reset" variant="secondary">
        クリア
      </Button>
    </form>
  );
}
