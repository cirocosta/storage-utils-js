storage-utils
===
> Little reference for webstorage


storage
---
from [W3](http://www.w3.org/TR/webstorage):
```
interface Storage {
  readonly attribute unsigned long length;
  DOMString? key(unsigned long index);
  getter DOMString getItem(DOMString key);
  setter creator void setItem(DOMString key, DOMString value);
  deleter void removeItem(DOMString key);
  void clear();
};
```

About
---
Provided under MIT License by [Ciro S. Costa](www.google.com/+ciroscosta).

[More on webstorage](http://www.w3.org/TR/webstorage/)