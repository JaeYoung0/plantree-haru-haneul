import {
  CheckboxPropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getNotionDB } from "@services/notion";
export interface MetaData {
  title: string;
  description: string;
  date: string;
}

export interface PostData {
  content: string;
  fileName: string;
  meta: MetaData;
}

export type ResolvePromise<T> = T extends Promise<infer U> ? U : never;
export type NotionPosts = ResolvePromise<ReturnType<typeof getNotionDB>>;
export type NotionPost = NotionPosts[number];

export type PostsPageProps = {
  posts: {
    id: string;
    title: string;
    subtitle: string;
    tags: SelectPropertyItemObjectResponse["select"][];
    iconUrl: string | null;
  }[];
};

// type WOW = SelectPropertyResponse

// 노션 db에서 정리한 컬럼들
export type MyNotionPageColumns = {
  title: TitleColumn;
  subtitle: SubtitleColumn;
  tags: MultiSelectPropertyItemObjectResponse;
  published: CheckboxPropertyItemObjectResponse;
  icon?: IconColumn;
};

export type TitleColumn = {
  type: "title";
  title: TextRichTextItemResponse[];
  id: string;
};
export type SubtitleColumn = {
  id: string;
  type: "rich_text";
  rich_text: TextRichTextItemResponse[];
};

export type PublishedColumn = {
  type: "checkbox";
  checkbox: boolean;
};

type IconColumn = {
  type: "files";
  files: Array<{
    file: {
      url: string;
      expiry_time: string;
    };
    name: string;
    type?: "file";
  }>;
  object: "property_item";
  id: string;
};
