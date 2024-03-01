import { Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  limit: number;
  total: number;
  onChange: (page: number) => void;
}

const blockSize = 10;

const Pagination = ({
  currentPage,
  limit,
  total,
  onChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(total / limit);
  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const start = currentBlock * blockSize + 1;
  const end = Math.min(start + blockSize - 1, totalPage);

  return (
    <Flex gap={4} justify={"center"}>
      <IconButton
        aria-label={"prev"}
        isDisabled={start === 1}
        onClick={() => onChange(start - 1)}
      >
        <Icon as={MdKeyboardArrowLeft} w={"6"} h={"6"} />
      </IconButton>
      {Array.from({ length: end - start + 1 }, (_, i) => i + start).map(
        (page) => (
          <Button
            key={page}
            variant={page === currentPage ? "solid" : "outline"}
            onClick={() => onChange(page)}
          >
            {page}
          </Button>
        )
      )}
      <IconButton
        aria-label={"next"}
        isDisabled={total === 0 || end === totalPage}
        onClick={() => onChange(end + 1)}
      >
        <Icon as={MdKeyboardArrowRight} w={"6"} h={"6"} />
      </IconButton>
    </Flex>
  );
};

export default Pagination;