import Search from '../molecules/Search';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Todo, { TodoProgressStatus } from '../../domains/todo';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { decrypt } from '../../common/utils/crypto';
import { FiCheckCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { useTodoStore } from '../../store/todo';
import { GridReadyEvent } from 'ag-grid-community';
import styled from 'styled-components';
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';

export interface TodoListProps {
  title: string;
  dataSource: Array<Todo>;
  onSave?: () => void;
}

const TodoList = (todoListProps: TodoListProps) => {
  return (
    <StyledSection>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-md-12 col-xl-10'>
            <Content {...todoListProps} />
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export default TodoList;

const StyledSection = styled.section.attrs(() => {
  return {
    className: 'vh-100',
  };
})`
  background-color: #eee;
`;

const Grid = forwardRef(({ dataSource, columnDefs }: { dataSource: Array<Todo>; columnDefs: Array<ColDef> }, ref) => {
  const gridApiRef = useRef<GridReadyEvent | null>(null);

  useImperativeHandle(ref, () => {
    return {
      search: (v: string) => gridApiRef.current?.api?.setQuickFilter(v),
    };
  });

  return (
    <AgGridReact
      className={'ag-theme-alpine'}
      headerHeight={30}
      onGridReady={(v: GridReadyEvent) => {
        gridApiRef.current = v;
      }}
      rowData={dataSource}
      columnDefs={columnDefs}
    />
  );
});

const Content = ({ title, dataSource, onSave }: TodoListProps) => {
  const [updateProgressStatusToProgress, updateProgressStatusToComplete, deleteById] = useTodoStore((state) => [
    state.updateProgressStatusToProgress,
    state.updateProgressStatusToComplete,
    state.deleteById,
  ]);

  const gridRef = useRef<{ search: (v: string) => void }>(null);

  const [searchText, setSearchText] = useState<string>();

  const emitSubmitEvent = () => {
    if (!onSave) return;
    onSave();
  };

  useEffect(() => {
    gridRef?.current?.search(searchText ?? '');
  }, [searchText]);

  return (
    <div
      className='card'
      style={{ height: 700, padding: '0px 20px 0px 20px' }}>
      <div className='card-header p-3'>
        <h5 className='mb-0'>
          <i className='fas fa-tasks me-2'></i>
          {title}
        </h5>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Search onSearch={(v) => setSearchText(v)} />
        </div>
      </div>
      <Grid
        ref={gridRef}
        columnDefs={[
          {
            field: 'title',
            headerName: '제목',
            width: 220,
            cellRenderer: ({ value }: { value: string }) => {
              return <>{decrypt(value)}</>;
            },
            getQuickFilterText: ({ value }: { value: string }) => {
              return decrypt(value);
            },
          },
          {
            field: 'content',
            headerName: '내용',
            width: 500,
            autoHeight: true,
            cellRenderer: ({ value }: { value: string }) => {
              return <span style={{ whiteSpace: 'pre-line' }}>{decrypt(value)}</span>;
            },
            getQuickFilterText: ({ value }: { value: string }) => {
              return decrypt(value);
            },
          },
          {
            field: 'status',
            headerName: '완료 여부',
            width: 90,
            cellRenderer: ({ value, data }: { value: TodoProgressStatus; data: any }) => {
              return (
                <>
                  {Todo.isComplete(value) ? (
                    <FiCheckCircle
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateProgressStatusToProgress(data.id);
                      }}
                      size={20}
                      color={'#366be6'}
                    />
                  ) : (
                    <FiMinusCircle
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateProgressStatusToComplete(data.id);
                      }}
                      size={20}
                      color={'rgb(171 178 198)'}
                    />
                  )}
                </>
              );
            },
          },
          {
            field: 'createDate',
            headerName: '등록 일시',
            width: 160,
            cellRenderer: ({ value }: { value: string }) => {
              return <>{format(new Date(value), 'yyyy-MM-dd HH:mm')}</>;
            },
          },
          {
            field: '',
            width: 60,
            cellRenderer: ({ data }: { data: any }) => {
              return (
                <>
                  {Todo.isComplete(data.status) ? (
                    <FiTrash2
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        deleteById(data.id);
                      }}
                      size={20}
                      color={'#cf0000a8'}
                    />
                  ) : null}
                </>
              );
            },
          },
        ]}
        dataSource={dataSource}
      />
      <div className='card-footer text-end p-3'>
        <button
          className='btn btn-primary'
          onClick={emitSubmitEvent}>
          등록
        </button>
      </div>
    </div>
  );
};
