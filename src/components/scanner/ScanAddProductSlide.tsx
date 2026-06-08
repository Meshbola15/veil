import Button from "@/components/common/button";

type Props = {
  onAdd?: () => void;
};

export function ScanAddProductSlide({ onAdd }: Props) {
  return (
    <div className="section-container flex flex-col gap-4 p-4 w-full">
      <div className="flex w-full flex-col gap-2">
        <h5 className="font-bricolage text-lg font-extrabold text-text-primary">
          Unknown Product
        </h5>

        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-neutral-500" aria-hidden />
          <p className="text-base font-semibold text-text-secondary">
            Not rated
          </p>
        </div>

        {/* <p className="font-inter text-sm text-text-secondary">
          None of these matches look right? Add this barcode to the community
          catalog.
        </p> */}

        <Button
          onClick={() => onAdd?.()}
          className="mt-4 w-full rounded-md"
        >
          Fill in the information
        </Button>
      </div>
    </div>
  );
}
