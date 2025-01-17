import Heading from "@/ui/Heading";
import Select from "@/ui/Select";
import Row from "@/ui/Row";
import HeaderRow from "@/ui/HeaderRow";
import useSearchQuery from "@/hooks/useSearchQuery";

type Props = {
  options: number;
  children: string;
  selectTitle?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
};

export const DisplayHeadingWithSelect: React.FC<Props> = ({
  options,
  children: title,
  selectTitle,
  onChange,
  value,
}) => {
  const [activeNum, setActiveNum] = useSearchQuery();

  return (
    <>
      <HeaderRow>
        <Heading as="h1">{title}</Heading>
        <Row>
          <Heading as="h3">
            Izvēleties nepieciešamo{" "}
            {selectTitle ||
              title.toLowerCase().substring(0, title.length - 1) + "u"}
          </Heading>
          <Select onChange={onChange} value={value}>
            {Array.from({ length: options }, (_, index) => index + 1).map(
              (num) => (
                <option value={num}>{num}</option>
              )
            )}
          </Select>
        </Row>
      </HeaderRow>
    </>
  );
};
