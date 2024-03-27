"use client";
import Image from "next/image";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);

  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const result = await unsplash.photos.getRandom({
          count: 9,
          collectionIds: ["317099"],
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='size-6 text-sky-700 animate-spin' />
      </div>
    );
  }
  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type='radio'
              readOnly
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              name={id}
              id={id}
              checked={selectedImageId === image.id}
              disabled={pending}
              className='hidden'
            />

            <Image
              alt='Unsplash image'
              src={image.urls.thumb}
              className='object-cover rounded-sm'
              fill
            />

            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 size-full bg-black/30 flex items-center justify-center'>
                <Check className='size-4 text-white' />
              </div>
            )}
            <Link
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
              target='_blank'
              href={image.links.html}
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='Image' errors={errors} />
    </div>
  );
};
