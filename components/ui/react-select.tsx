import { type ClassNamesConfig, type GroupBase, type StylesConfig } from "react-select";
import AsyncSelectComponent from "react-select/async";
import CreatableSelect from "react-select/creatable";
import SelectComponent from "react-select";
import type { Props } from "react-select";
import { cn } from "@/lib";

//Check here for new types
// https://gist.github.com/ilkou/7bf2dbd42a7faf70053b43034fc4b5a4

/**
 * styles that aligns with shadcn/ui
 */
const controlStyles = {
  base: "flex h-[45px] w-full rounded-md border border-input bg-transparent px-5  py-2 gap-1 text-sm shadow-sm transition-colors hover:cursor-pointer",
  focus: "outline-none ring-2 ring-ring ring-offset-2",
  disabled: "cursor-not-allowed opacity-50",
};
const placeholderStyles = "text-sm text-muted-foreground font-extralight";
const valueContainerStyles = "gap-1";
const multiValueStyles =
  "inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
const indicatorsContainerStyles = "gap-1";
const clearIndicatorStyles = "p-1 rounded-md";
const indicatorSeparatorStyles = "bg-border";
const dropdownIndicatorStyles = "p-1 rounded-md";
const menuStyles = "p-1 mt-1 border bg-popover shadow-md rounded-md text-popover-foreground";
const groupHeadingStyles = "py-2 px-1 text-secondary-foreground text-sm font-semibold";
const optionStyles = {
  base: "hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1.5 rounded-sm !text-sm !cursor-default !select-none !outline-none font-sans",
  focus: "active:bg-accent/90 bg-accent text-accent-foreground",
  disabled: "pointer-events-none opacity-50",
  selected: "",
};
const noOptionsMessageStyles = "text-accent-foreground p-2 bg-accent border border-dashed border-border rounded-sm";
const loadingIndicatorStyles = "flex items-center justify-center h-4 w-4 opacity-50";
const loadingMessageStyles = "text-accent-foreground p-2 bg-accent";

/**
 * This factory method is used to build custom classNames configuration
 */
export const createClassNames = (classNames: ClassNamesConfig): ClassNamesConfig => {
  return {
    clearIndicator: (state) => cn(clearIndicatorStyles, classNames?.clearIndicator?.(state)),
    container: (state) => cn(classNames?.container?.(state)),
    control: (state) => cn(controlStyles.base, state.isDisabled && controlStyles.disabled, state.isFocused && controlStyles.focus, classNames?.control?.(state)),
    dropdownIndicator: (state) => cn(dropdownIndicatorStyles, classNames?.dropdownIndicator?.(state)),
    group: (state) => cn(classNames?.group?.(state)),
    groupHeading: (state) => cn(groupHeadingStyles, classNames?.groupHeading?.(state)),
    indicatorsContainer: (state) => cn(indicatorsContainerStyles, classNames?.indicatorsContainer?.(state)),
    indicatorSeparator: (state) => cn(indicatorSeparatorStyles, classNames?.indicatorSeparator?.(state)),
    input: (state) => cn(classNames?.input?.(state)),
    loadingIndicator: (state) => cn(loadingIndicatorStyles, classNames?.loadingIndicator?.(state)),
    loadingMessage: (state) => cn(loadingMessageStyles, classNames?.loadingMessage?.(state)),
    menu: (state) => cn(menuStyles, classNames?.menu?.(state)),
    menuList: (state) => cn(classNames?.menuList?.(state)),
    menuPortal: (state) => cn(classNames?.menuPortal?.(state)),
    multiValue: (state) => cn(multiValueStyles, classNames?.multiValue?.(state)),
    multiValueLabel: (state) => cn(classNames?.multiValueLabel?.(state)),
    multiValueRemove: (state) => cn(classNames?.multiValueRemove?.(state)),
    noOptionsMessage: (state) => cn(noOptionsMessageStyles, classNames?.noOptionsMessage?.(state)),
    option: (state) => cn(optionStyles.base, state.isFocused && optionStyles.focus, state.isDisabled && optionStyles.disabled, state.isSelected && optionStyles.selected, classNames?.option?.(state)),
    placeholder: (state) => cn(placeholderStyles, classNames?.placeholder?.(state)),
    singleValue: (state) => cn(classNames?.singleValue?.(state)),
    valueContainer: (state) => cn(valueContainerStyles, classNames?.valueContainer?.(state)),
  };
};
export const defaultClassNames = createClassNames({});
export const defaultStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    whiteSpace: "normal",
    overflow: "visible",
  }),
  control: (base) => ({
    ...base,
    transition: "none",
    // minHeight: '2.25rem', // we used !min-h-9 instead
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      background: "transparent",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "hsl(var(--border))",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent",
    },
  }),
};

// ~~~ ReactSelectCustomComponents.tsx
// SOURCE: https://gist.github.com/ilkou/7bf2dbd42a7faf70053b43034fc4b5a4
import * as React from "react";
import type { ClearIndicatorProps, DropdownIndicatorProps, MenuListProps, MenuProps, MultiValueRemoveProps, OptionProps } from "react-select";
import { components } from "react-select";
import { CheckIcon, Cross2Icon as CloseIcon } from "@radix-ui/react-icons";
import { FixedSizeList as List } from "react-window";
import { ChevronDown } from "lucide-react";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className={"h-4 w-4 opacity-50"} />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <CloseIcon className={"h-3.5 w-3.5 opacity-50"} />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon className={"h-3 w-3 opacity-50"} />
    </components.MultiValueRemove>
  );
};

const Option = (props: OptionProps) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        {/* TODO: Figure out the type */}
        <div>{(props.data as { label: string }).label}</div>
        {props.isSelected && <CheckIcon />}
      </div>
    </components.Option>
  );
};

// Using Menu and MenuList fixes the scrolling behavior
const Menu = (props: MenuProps) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};

const MenuList = (props: MenuListProps) => {
  const { children, maxHeight } = props;

  const childrenArray = React.Children.toArray(children);

  const calculateHeight = () => {
    // When using children it resizes correctly
    const totalHeight = childrenArray.length * 35; // Adjust item height if different
    return totalHeight < maxHeight ? totalHeight : maxHeight;
  };

  const height = calculateHeight();

  // Ensure childrenArray has length. Even when childrenArray is empty there is one element left
  if (!childrenArray || childrenArray.length - 1 === 0) {
    return <components.MenuList {...props} />;
  }
  return (
    <List
      height={height}
      itemCount={childrenArray.length}
      itemSize={35} // Adjust item height if different
      width="100%"
    >
      {({ index, style }) => <div style={style}>{childrenArray[index]}</div>}
    </List>
  );
};

export const Select = React.forwardRef<React.ElementRef<typeof SelectComponent>, React.ComponentPropsWithoutRef<typeof SelectComponent>>((props: Props, ref) => {
  const { value, onChange, options = [], styles = defaultStyles, classNames = defaultClassNames, components = {}, ...rest } = props;
  const id = React.useId();

  return (
    <SelectComponent
      instanceId={id}
      ref={ref}
      value={value}
      onChange={onChange}
      options={options}
      unstyled
      components={{
        DropdownIndicator,
        ClearIndicator,
        IndicatorSeparator: () => null,
        MultiValueRemove,
        Option,
        Menu,
        MenuList,
        ...components,
      }}
      styles={styles}
      classNames={classNames}
      {...rest}
    />
  );
});

Select.displayName = "Select";

export const Creatable = React.forwardRef<React.ElementRef<typeof CreatableSelect>, React.ComponentPropsWithoutRef<typeof CreatableSelect>>((props: Props, ref) => {
  const { value, onChange, options = [], styles = defaultStyles, classNames = defaultClassNames, components = {}, ...rest } = props;

  const id = React.useId();

  return (
    <CreatableSelect
      instanceId={id}
      ref={ref}
      value={value}
      onChange={onChange}
      options={options}
      unstyled
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Option,
        Menu,
        MenuList,
        ...components,
      }}
      styles={styles}
      classNames={classNames}
      {...rest}
    />
  );
});
Creatable.displayName = "Creatable";

export const AsyncSelect = React.forwardRef<React.ElementRef<typeof AsyncSelectComponent>, React.ComponentPropsWithoutRef<typeof AsyncSelectComponent>>((props: Props, ref) => {
  const { value, onChange, options = [], styles = defaultStyles, classNames = defaultClassNames, components = {}, ...rest } = props;
  const id = React.useId();

  return (
    <AsyncSelectComponent
      instanceId={id}
      ref={ref}
      value={value}
      onChange={onChange}
      options={options}
      unstyled
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Option,
        Menu,
        MenuList,
        ...components,
      }}
      styles={styles}
      classNames={classNames}
      {...rest}
    />
  );
});
AsyncSelect.displayName = "Async Select";
